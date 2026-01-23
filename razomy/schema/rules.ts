export interface RuleToken<L> {
  ruleType: 'token';
  tokenType: L
}

export interface RuleSeq<R> {
  ruleType: 'seq';
  rules: R[]
}

export interface RuleAny<R> {
  ruleType: 'any';
  rules: R[]
}

export interface RuleRep<R> {
  ruleType: 'rep';
  rule: R
}
