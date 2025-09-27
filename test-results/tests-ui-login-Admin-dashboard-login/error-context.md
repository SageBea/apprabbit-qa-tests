# Page snapshot

```yaml
- generic [ref=e1]:
  - generic:
    - iframe [active] [ref=e2]:
      - generic [ref=f1e1]:
        - button "Enable accessibility" [ref=f1e2]
        - img [ref=f1e4]
    - generic [ref=e4]:
      - generic [ref=e5]:
        - heading "Welcome to AppRabbit" [level=1] [ref=e6]
        - generic [ref=e8]:
          - button "Continue with Google" [ref=e9] [cursor=pointer]:
            - img [ref=e10] [cursor=pointer]
            - text: Continue with Google
          - button "Continue with Email" [ref=e12] [cursor=pointer]
        - generic [ref=e13]:
          - paragraph [ref=e14]: New to AppRabbit?
          - link "Sign Up" [ref=e15] [cursor=pointer]:
            - /url: /signup
            - paragraph [ref=e16] [cursor=pointer]: Sign Up
      - img "Horizon UI" [ref=e17]
  - region "top-end Notifications alt+T"
```