import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { remixer } from "../Remixer";
import { NumberVariable } from "../variables/NumberVariable";
import { Variable } from "../variables/Variable";
import { VariableType } from "../../lib/Constants";

const expect = chai.expect;
chai.use(sinonChai);

describe("NumberVariable", () => {
  const key: string = "test variable";
  const sanitizedKey: string = "test_variable";
  const defaultValue: number = 20;
  const possibleValues: Array<number> = [10, 20, 30, 40];
  let callbackSpy: sinon.SinonSpy;
  let variable: NumberVariable;

  beforeEach(() => {
    callbackSpy = sinon.spy();
    variable = remixer.addNumberVariable(key, defaultValue, possibleValues, callbackSpy);
  });

  it("should create a new variable", () => {
    expect(variable).to.be.instanceof(Variable).and.instanceof(NumberVariable);
  });

  it("have the correct datatype", () => {
    expect(variable.dataType).to.equal(VariableType.NUMBER);
  });

  it("have the correct title", () => {
    expect(variable.title).to.equal(key);
  });

  it("have the correct sanitized key", () => {
    expect(variable.key).to.equal(sanitizedKey);
  });

  it("have the correct possible values", () => {
    expect(variable.possibleValues).to.equal(possibleValues);
  });

  it("should trigger callback when selected value of variable changes", () => {
    const newValue = 100;
    variable.selectedValue = newValue;

    const updatedVariable = callbackSpy.args[0][0];
    expect(callbackSpy).to.have.been.calledOnce.and.calledWith(variable);
    expect(updatedVariable.selectedValue).to.equal(newValue);
  });
});
