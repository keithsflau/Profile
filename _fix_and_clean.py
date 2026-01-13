
import os
import re
import shutil

ROOT_DIR = r"C:\Users\keith\OneDrive\Desktop\Profile"
VISIT_COUNTER_CSS = "visit-counter.css"
VISIT_COUNTER_JS = "visit-counter.js"

items_deleted = 0
links_removed = 0
footers_fixed = 0

def get_relative_path_to_root(current_file_dir):
    try:
        rel = os.path.relpath(ROOT_DIR, current_file_dir)
        return rel
    except:
        return "."

def fix_duplicate_footers(content):
    if content.count('<footer') <= 1:
        return content, False
    
    footer_pattern = re.compile(r'<footer.*?</footer>', re.DOTALL | re.IGNORECASE)
    footers = footer_pattern.findall(content)
    
    if len(footers) > 1:
        # Keep the last one
        target = footers[-1]
        temp_content = footer_pattern.sub("", content)
        if "</body>" in temp_content:
            new_content = temp_content.replace("</body>", f"{target}\n</body>")
        else:
            new_content = temp_content + target
        return new_content, True
    return content, False

def pass_1_repair_and_prune():
    # Fix Footers, Fix Resource Links, Delete Broken Apps
    global footers_fixed, items_deleted
    
    for root, dirs, files in os.walk(ROOT_DIR):
        if ".git" in root or ".venv" in root: continue
        
        # Snapshot files list to iterate safely
        for file in files[:]:
            if not file.lower().endswith(".html"): continue
            file_path = os.path.join(root, file)
            
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except: continue

            original_content = content
            changed = False

            # 1. Duplicate Footer
            content, footer_changed = fix_duplicate_footers(content)
            if footer_changed: 
                footers_fixed += 1
                changed = True

            # 2. Fix Resource Paths (CSS/JS)
            root_rel = get_relative_path_to_root(root)
            
            def fix_path_resHelper(match, url):
                # Helper to fix visit-counter and common paths
                if "visit-counter.css" in url:
                    return os.path.join(root_rel, VISIT_COUNTER_CSS).replace("\\", "/")
                if "visit-counter.js" in url:
                    return os.path.join(root_rel, VISIT_COUNTER_JS).replace("\\", "/")
                return url

            # CSS
            def fix_css(m):
                url = m.group(1)
                new_url = fix_path_resHelper(m, url)
                if new_url != url: return m.group(0).replace(url, new_url)
                return m.group(0)
            
            new_content = re.sub(r'<link[^>]+href=["\'](.*?)["\'][^>]*>', fix_css, content)
            if new_content != content:
                content = new_content
                changed = True

            # JS
            def fix_js(m):
                url = m.group(1)
                new_url = fix_path_resHelper(m, url)
                if new_url != url: return m.group(0).replace(url, new_url)
                return m.group(0)
                
            new_content = re.sub(r'<script[^>]+src=["\'](.*?)["\'][^>]*>', fix_js, content)
            if new_content != content:
                content = new_content
                changed = True
                
            # 3. Check for MISSING Resources (Critical)
            # Find all src="..." and link href="..." that are local
            # If missing -> Delete App
            
            is_broken_app = False
            
            resources = re.findall(r'(?:src|href)=["\'](.*?)["\']', content)
            for res in resources:
                if res.startswith(('http', '#', 'mailto:', 'javascript:')): continue
                if "visit-counter" in res: continue # Already fixed or handled
                if ".ico" in res or ".svg" in res or "favicon" in res: continue # Ignored
                if ".html" in res: continue # Links to pages are Navigation (Pass 2), not resources
                
                # Check exist
                if res.startswith('/'):
                    target = os.path.join(ROOT_DIR, res.lstrip('/'))
                else:
                    target = os.path.join(root, res)
                    
                if not os.path.exists(target):
                    # Try to tolerate "style.css" missing in bible study if we can fix it?
                    # For now, strict: If local JS/CSS missing, Broken.
                    print(f"Broken Resource: {res} in {file_path}")
                    is_broken_app = True
                    break
            
            if is_broken_app:
                print(f"Deleting broken app file: {file_path}")
                try:
                    os.remove(file_path)
                    items_deleted += 1
                    # Clean empty dir?
                    if not os.listdir(root):
                        os.rmdir(root)
                except Exception as e:
                    print(f"Failed delete: {e}")
                continue # Skip writing

            if changed:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

def pass_2_clean_links():
    # Remove broken <a> links
    global links_removed
    
    for root, dirs, files in os.walk(ROOT_DIR):
        if ".git" in root or ".venv" in root: continue
        
        for file in files:
            if not file.lower().endswith(".html"): continue
            file_path = os.path.join(root, file)
            
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except: continue
            
            original_content = content
            changed = False
            
            # Find all Links
            # We want to remove the <a> block if href is broken
            
            # Helper to check if link is broken
            def is_link_broken(url):
                if url.startswith(('http', '//', '#', 'mailto:', 'javascript:', 'tel:')): return False
                
                # Resolve
                if url.startswith('/'):
                    target = os.path.join(ROOT_DIR, url.lstrip('/'))
                else:
                    target = os.path.join(root, url)
                    
                return not os.path.exists(target)

            # We use a primitive parsing approach to identify <a> tags.
            # Regex finding <a ... href="...">...</a> is fragile but maybe sufficient.
            # Iterate finding hrefs, then check validity.
            
            links = re.findall(r'href=["\'](.*?)["\']', content)
            for link in links:
                if is_link_broken(link):
                     # Construct regex to remove this specific link tag
                     # Attempt to remove the whole <a> element
                     # Be careful if same link appears twice.
                     escaped_link = re.escape(link)
                     # matches <a ... href="link" ...> ... </a>
                     # Try to match simplest case
                     pattern = r'<a\s+[^>]*href=["\']' + escaped_link + r'["\'][^>]*>.*?</a>'
                     
                     new_content = re.sub(pattern, "", content, flags=re.DOTALL | re.IGNORECASE)
                     if new_content != content:
                         content = new_content
                         changed = True
                         links_removed += 1
                         print(f"Removed broken link: {link} in {file_path}")
            
            if changed:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

if __name__ == "__main__":
    print("Starting Pass 1: Repairs and Pruning...")
    pass_1_repair_and_prune()
    print("Starting Pass 2: Cleaning Links...")
    pass_2_clean_links()
    print(f"Done. Fixed {footers_fixed} footers, Deleted {items_deleted} broken apps, Removed {links_removed} dead links.")
