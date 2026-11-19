# Clean-clone verification

Arif Mert Şengel - 2024501012

Performed on 19 November 2026, Europe/Istanbul.

Repository: https://github.com/mertsengel125-coder/assignment4-destructuring-field-guide

The tested source commit was `b3c6de58038aa364fce643519340dc3e209caf47`.
This report was added after the tests. Future source changes need another run.

## Installation and execution

The public repository was cloned into a separate empty directory, without
copying the working project's node_modules. These commands were run there:

```sh
git clone https://github.com/mertsengel125-coder/assignment4-destructuring-field-guide.git
cd assignment4-destructuring-field-guide
npm install
npm run all
npm run check
npm run depth
```

The actual install additionally selected a local npm cache and used
`--no-audit --no-fund`; these flags do not change the project source.

| Check | Result |
| --- | --- |
| npm install | Exit code 0 |
| npm run all | Exit code 0; 5311 stdout bytes; no stderr |
| Recorded output.txt | Byte-for-byte match with the clean-clone all output |
| npm run check | Exit code 0; no TypeScript errors |
| npm run depth | Exit code 0; 1414 stdout bytes; no stderr |
| Recorded depth-output.txt | Byte-for-byte match with the clean-clone depth output |

Environment: Node.js v26.13.0, npm 11.20.0, TypeScript 5.8.3.

npm install emitted the following warning. The install and all subsequent
commands still succeeded; no allowScripts configuration was changed for this run.

```text
npm warn install-scripts 2 packages have install scripts not yet covered by allowScripts:
npm warn install-scripts   esbuild@0.28.2 (postinstall: node install.js)
npm warn install-scripts   fsevents@2.3.3 (install: (install scripts present))
npm warn install-scripts
npm warn install-scripts Run `npm install-scripts ls` to review, or `npm install-scripts approve <pkg>` to allow.
```

## Rebuilding the submitted LaTeX source

The clone's existing latex/main.tex was compiled with Tectonic 0.17.0:

```sh
bash scripts/build_pdf.sh
```

The run selected the portable compiler through TECTONIC_BIN and its local cache
through TECTONIC_CACHE_DIR. Pandoc was not needed because main.tex is supplied.
The build returned exit code 0, with no TeX errors, overfull boxes or missing
characters. The rebuilt PDF had 26 physical pages. Extracted text from every page
matched the published PDF. The generated PDF's bytes changed during rebuilding;
PDF byte identity was not used as the reproducibility criterion.

The build modifies the tracked latex/main.pdf. Other tracked files stayed
unchanged. The original reviewed PDF remains the submission artifact.
See latex/build-report.txt for the original build's visual and content checks.

## Bonus status

Bonus 1 and Bonus 2 are documented in README.md. Bonus 3 remains deferred.
This report does not complete Bonus 4's requirement for work across several days.
Inspect the real commit dates with git log; GIT_WORK_PLAN.md lists the remaining
planned work for 20 and 21 November.
