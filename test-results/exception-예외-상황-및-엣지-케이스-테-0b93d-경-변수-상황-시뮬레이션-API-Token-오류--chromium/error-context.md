# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: exception.spec.js >> 예외 상황 및 엣지 케이스 테스트 >> 잘못된 환경 변수 상황 시뮬레이션 (API Token 오류)
- Location: tests\exception.spec.js:62:7

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\hg128\AppData\Local\ms-playwright\chromium_headless_shell-1217\chrome-headless-shell-win64\chrome-headless-shell.exe
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     npx playwright install                                 ║
║                                                            ║
║ <3 Playwright Team                                         ║
╚════════════════════════════════════════════════════════════╝
```