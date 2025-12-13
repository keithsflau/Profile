import os

def scan_html_endings(start_dir):
    print(f"Scanning .html files in {start_dir}...")
    issues_found = 0
    
    for root, dirs, files in os.walk(start_dir):
        # Skip .git and node_modules
        if '.git' in dirs:
            dirs.remove('.git')
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
            
        for file in files:
            if file.lower().endswith('.html'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        
                    # Find the last occurrence of </html>
                    end_tag_index = content.rfind('</html>')
                    
                    if end_tag_index != -1:
                        # Check content after </html>
                        after_end = content[end_tag_index + 7:].strip()
                        if after_end:
                            print(f"\n[ISSUE] {file_path}")
                            print(f"Found content after </html>: {after_end[:100]}...")
                            issues_found += 1
                        # else:
                        #     print(f"[OK] {file_path}")
                    else:
                        print(f"\n[WARNING] No </html> tag found in {file_path}")
                        
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")

    print(f"\nScan complete. {issues_found} potential issues found.")

if __name__ == "__main__":
    scan_html_endings(".")
