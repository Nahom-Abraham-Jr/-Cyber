# Learning Path Enhancement

## Goal Description
Create a comprehensive, premium learning path within `AwarenessHub` that covers essential cybersecurity prevention topics. The path must fully respect language switching – all UI text, tips, questions, options, and explanations should update instantly when the user changes the language via the global store.

## User Review Required
> [!IMPORTANT]
> The proposed modules and translation keys are outlined below. Please review the topics and confirm if you would like to add all of them or adjust the list. Once approved, we will implement the content and update the translation files.

## Open Questions
- Do you want to include **Multi‑Factor Authentication (MFA)** as a separate module?
- Should we add a **Software Updates & Patch Management** module?
- Any additional topics (e.g., **Secure Wi‑Fi**, **Backups**, **Social Engineering**) you’d like to see?

## Proposed Changes
---
### src/components/AwarenessHub.tsx
- Expand the `MODULES` array with new comprehensive modules:
  1. **Phishing Awareness** (already present)
  2. **Password Hygiene** (already present)
  3. **Multi‑Factor Authentication**
  4. **Software Updates & Patch Management**
  5. **Secure Wi‑Fi & Network Use**
  6. **Data Backups & Recovery**
  7. **Social Engineering & Pre‑texting**
- Each module will contain:
  - `title`
  - `summary`
  - `tip`
  - `question`
  - `options`
  - `correctAnswer`
  - `explanation`
- All strings will be generated from the translation function `t()` based on the current `language` from the Zustand store, ensuring immediate UI updates.

---
### src/lib/translations.ts
- Add translation entries for every new module in all supported languages (`en`, `es`, `am`, `om`).
- Structure example:
```ts
learning: {
  modules: {
    mfa: {
      title: { en: 'Multi‑Factor Authentication', es: 'Autenticación de múltiples factores', am: 'ብዙ‑ክሊክ ማረጋገጫ', om: 'MFA' },
      summary: { ... },
      tip: { ... },
      question: { ... },
      options: { ... },
      correctAnswer: 2,
      explanation: { ... }
    },
    // repeat for other modules
  }
}
```
- The existing `t` helper will automatically pick the correct language.

---
### src/store/appStore.ts (no change)
- Language state already persists globally; `LanguageSync` component updates the `<html lang>` attribute.

## Verification Plan
### Automated Tests
- Run the dev server and manually switch languages (EN → ES → AM → OM) ensuring every piece of text in the Learning Hub updates instantly.
- Verify that each module renders correctly and that the knowledge‑check flow works for all modules.

### Manual Verification
- Present the updated Learning Hub to a stakeholder to confirm the content feels complete and premium.
- Ensure the UI retains the modern glassmorphic styling and micro‑animations already present.

---
**Next Steps after Approval**
- Implement the expanded `MODULES` array.
- Populate translation file with the new keys.
- Test language switching.
- Polish UI (consistent spacing, icons, animations).
