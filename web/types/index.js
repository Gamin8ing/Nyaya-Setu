// Shared shape hints (JSDoc) for hackathon; no TS build needed.

/** @typedef {Object} CaseInput
 *  @property {string} facts
 *  @property {string} issue
 *  @property {string} rationale
 *  @property {string} currentJudgment
 *  @property {string} [comments]
 *  @property {File[]} [documents]
 */

/** @typedef {Object} PrecedentMatch
 *  @property {string} caseName
 *  @property {string} [citation]
 *  @property {string} [court]
 *  @property {(string|number)} [year]
 *  @property {string} whyRelevant
 *  @property {string[]} overlaps
 */

/** @typedef {Object} LanguageAlignment
 *  @property {string} english
 *  @property {string} hindiLegal
 *  @property {string[]} statuteRefs
 *  @property {string} [note]
 */

/** @typedef {Object} CaseResult
 *  @property {string[]} [parties]
 *  @property {string[]} [statutes]
 *  @property {string[]} [issues]
 *  @property {string[]} [keyFacts]
 *  @property {PrecedentMatch[]} [precedentMatches]
 *  @property {LanguageAlignment[]} [languageAlignment]
 *  @property {string[]} [assistantNotes]
 *  @property {string} [disclaimer]
 */

/** @typedef {Object} ChatMessage
 *  @property {string} id
 *  @property {('user'|'assistant'|'system')} role
 *  @property {string} content
 *  @property {number} createdAt
 */

/** @typedef {Object} ChatSession
 *  @property {string} id
 *  @property {string} title
 *  @property {number} createdAt
 *  @property {number} updatedAt
 *  @property {ChatMessage[]} messages
 *  @property {CaseResult} [lastResult]
 */

// No exports needed; shapes used via JSDoc annotations.
