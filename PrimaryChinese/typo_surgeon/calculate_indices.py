
def print_indices(text):
    print(f"Text: {text}")
    print("-" * 20)
    for i, char in enumerate(text):
        print(f"{i}: {char}")

levels = [
    {
        "id": 1,
        "content": "今天天氣很差，我心情十分煩燥。既使下雨，我仍然堅持去圖書館溫習。我必須辯別哪些資料是正確的，才能完成報告。",
        "typos": ["燥", "既", "辯"]
    },
    {
        "id": 2,
        "content": "這本小說的內容很豐復，反應了當時的社會面貌。讀者讀後反映熱烈，紛紛在網上發表意見。",
        "typos": ["復", "應", "映"]
    },
    {
        "id": 3,
        "content": "我們不應已貌取人，而要懂得欣賞別人的內在美。盡管外表平凡，也可以有出色的表現。",
        "typos": ["已", "盡"]
    }
]

for level in levels:
    print(f"\nLevel {level['id']}")
    print_indices(level['content'])
