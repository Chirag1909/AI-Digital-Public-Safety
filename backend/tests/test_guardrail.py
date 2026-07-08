from models.guardrail import ConfidenceGuardrail


def test_guardrail_high_risk() -> None:
    guardrail = ConfidenceGuardrail()
    outcome = guardrail.evaluate(0.95)
    assert outcome.risk == "high_risk"
    assert outcome.needs_review is False


def test_guardrail_review_queue() -> None:
    guardrail = ConfidenceGuardrail()
    outcome = guardrail.evaluate(0.75)
    assert outcome.risk == "needs_human_review"
    assert outcome.needs_review is True


def test_guardrail_safe() -> None:
    guardrail = ConfidenceGuardrail()
    outcome = guardrail.evaluate(0.60)
    assert outcome.risk == "safe"
    assert outcome.needs_review is False
