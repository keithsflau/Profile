
import os
import re
import json

ROOT_DIR = r"C:\Users\keith\OneDrive\Desktop\Profile"
LOG_FILE = "audit_log.json"

def fix_duplicate_footers(content):
    # Pattern to find footer
    # simple check: count <footer
    if content.count('<footer') <= 1:
        return content, False
    
    # logic: often duplicates are appended. We keep the last one? 
    # Or strict check: content before </body> repeated?
    # Heuristic: Find the last </footer>. If there is stuff after it that looks like another html end, that's bad.
    # But usually it's: <html>...<footer>...</footer>... <html>...<footer>...</footer>
    
    # We will try to preserve the *first* valid html structure or the *last* valid one?
    # Usually "repeated footer" means the footer code appears twice.
    # Regex replacement: replace all <footer.../footer> with a single one?
    # Safer: Split by <footer, keep the parts, reconstruct.
    
    # Approach: Find all footer blocks.
    footer_pattern = re.compile(r'<footer.*?</footer>', re.DOTALL | re.IGNORECASE)
    footers = footer_pattern.findall(content)
    
    if len(footers) > 1:
        # If they are identical, just keep one.
        if all(f == footers[0] for f in footers):
            # Replace all occurrences with empty string, then append one at the right place?
            # Easier: Replace match 2..N with empty.
            
            # Re-read to handle positions
            def replace_callback(match):
                # We need state to know which match this is.
                replace_callback.counter += 1
                if replace_callback.counter > 1:
                    return "" # Remove subsequent footers
                return match.group(0)
            
            replace_callback.counter = 0
            new_content = footer_pattern.sub(replace_callback, content)
            return new_content, True
            
        else:
            # If different, this is tricky. The user said "duplicate footer".
            # Often happens if a script appends a footer.
            # We'll assume the *last* one is the most 'recent' or 'correct' if appended?
            # Or the first one is the original?
            # Let's count bytes.
            
            # heuristic: Keep the one that matches the standard footer format (Jeremiah 10:12)
            # If both match, keep last.
            
            valid_footers = [f for f in footers if "Jeremiah" in f]
            if not valid_footers:
                 # none satisfy? keep last
                 target = footers[-1]
            else:
                 target = valid_footers[-1]

            # Replace ALL footers with the Target
            # But we must place it correctly.
            # Remove all footers from text.
            temp_content = footer_pattern.sub("", content)
            
            # Insert Target before </body>
            if "</body>" in temp_content:
                new_content = temp_content.replace("</body>", f"{target}\n</body>")
            else:
                new_content = temp_content + target
                
            return new_content, True

    return content, False

def check_structure_duplication(content):
    # Sometimes the whole HTML is duplicated.
    # Check for multiple <html or <!DOCTYPE
    if content.count('<!DOCTYPE') > 1 or content.count('<html') > 1:
        # aggressive fix: take the code from Last <!DOCTYPE down to end?
        # or First?
        # usually the file is appended to.
        # Let's try to just detect for now.
        return True
    return False

def audit_files():
    broken_links = []
    fixed_footers = []
    structural_errors = []

    for root, dirs, files in os.walk(ROOT_DIR):
        if ".git" in root or ".venv" in root:
            continue
            
        for file in files:
            if not file.lower().endswith(".html"):
                continue
                
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                original_content = content
                
                # Check 1: Duplicate Footer
                content, changed = fix_duplicate_footers(content)
                if changed:
                    fixed_footers.append(file_path)
                    print(f"Fixed footer in: {file_path}")
                
                # Check 2: Structure
                if check_structure_duplication(content):
                    structural_errors.append(file_path)
                    # Try to fix: Find first </html> and truncate? 
                    # Or find last <html>?
                    # Let's keep the FIRST fully valid HTML block if possible.
                    # Or usually, files get appended. so the first one is the old one?
                    # Actually often checking "file check link" implies looking for broken hrefs.
                    pass

                # Save if changed
                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                        
                # Check 3: Links
                # Regex for href="..."
                # We mimic browser behavior roughly
                links = re.findall(r'href=["\'](.*?)["\']', content)
                for link in links:
                    link = link.strip()
                    if not link or link.startswith(('#', 'javascript:', 'mailto:', 'tel:')):
                        continue
                    
                    if link.startswith(('http://', 'https://')):
                        # Skip external for now to speed up, or maybe verify lightly?
                        # User said "dead link", "upload to github".
                        # If I check external, it might take forever.
                        # Focus on INTERNAL links first as those cause immediate broken site.
                        continue
                        
                    # Internal link
                    # Handle queries ? and fragments #
                    clean_link = link.split('#')[0].split('?')[0]
                    if not clean_link:
                        continue
                        
                    # Resolve path
                    if clean_link.startswith('/'):
                        # Absolute to root? Or drive root?
                        # Usually logic is relative to Web Root. Assuming ROOT_DIR is web root.
                        target_path = os.path.join(ROOT_DIR, clean_link.lstrip('/'))
                    else:
                        target_path = os.path.join(root, clean_link)
                    
                    if not os.path.exists(target_path):
                        # Try decoding URL
                        try:
                            from urllib.parse import unquote
                            target_path_decoded = os.path.join(os.path.dirname(target_path), unquote(os.path.basename(target_path)))
                            if os.path.exists(target_path_decoded):
                                continue
                        except:
                            pass
                            
                        # Report
                        print(f"Missing Link: {link} in {file_path}")
                        broken_links.append({
                            "source": file_path,
                            "target": link,
                            "resolved": target_path
                        })

            except Exception as e:
                print(f"Error processing {file_path}: {e}")

    report = {
        "fixed_footers": fixed_footers,
        "structural_errors": structural_errors,
        "broken_links": broken_links
    }
    
    with open(LOG_FILE, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)

    print(f"Audit Complete. {len(fixed_footers)} footers fixed. {len(broken_links)} broken links found.")

if __name__ == "__main__":
    audit_files()
