# Verification record

Arif Mert Şengel - 2024501012

Date: 21 November 2026, Europe/Istanbul.

Repository: https://github.com/mertsengel125-coder/assignment4-destructuring-field-guide

## Clean-clone execution

The public repository was cloned into a separate directory without copying
node_modules. The tested commit was
`3793cfef15b5050c167d99fd6f0f9ee271918137`.

```sh
git clone https://github.com/mertsengel125-coder/assignment4-destructuring-field-guide.git
cd assignment4-destructuring-field-guide
npm install
npm run all
npm run check
npm run depth
```

The actual install additionally selected a local npm cache and used
`--no-audit --no-fund`.

| Check | Result |
| --- | --- |
| npm install | Exit code 0 |
| npm run all | Exit code 0; 5311 stdout bytes; no stderr |
| npm run check | Exit code 0; no TypeScript errors |
| npm run depth | Exit code 0; 1414 stdout bytes; no stderr |
| output.txt | Byte-for-byte match with both the repository and working-copy output |
| depth-output.txt | Byte-for-byte match with both the repository and working-copy output |

All 15 runtime/configuration files in js/, ts/, package.json, package-lock.json
and tsconfig.json were compared with the final working copy and were identical.
The later changes concern documentation and PDF layout. The test clone had a
clean Git working tree after installation and the three checks.

Environment: Node.js v26.13.0, npm 11.20.0, TypeScript 5.8.3.

The install warned that esbuild@0.28.2 and fsevents@2.3.3 had install scripts not
covered by allowScripts. Installation and the subsequent commands succeeded.
No allowScripts configuration was changed for this verification.

## Final guide and PDF

The final working-copy README outputs match the recorded output files.
The guide contains 12 form entries, five pitfalls, T1-T5, P1-P7, a 12-row
comparison table, seven depth investigations, five real-code cases and five
personal log entries.

The LaTeX source was generated with Pandoc 3.14 and compiled with Tectonic 0.17.0.
The final PDF has 31 physical pages, 111 code/output listings and two real tables.
The compiler log has no errors, overfull boxes or missing-character diagnostics.
All pages were rendered and visually reviewed. Main headings and explanation
labels were given sufficient space to stay with the following content.
The checked PDF is the submission artifact; see latex/build-report.txt.

## Bonus record

README.md explicitly claims Bonuses 1-4. The repository history records work
on 19 and 21 November 2026. These are two calendar dates; no additional work
dates are claimed. The instructor assesses the history against the requirement
for work over several days. The repository is public.
