/** @license
 *  Copyright 2016 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import * as React from "react";
import { CSS, VariableType } from "../../lib/Constants";
import { StringControlProps } from "./controlProps";

/**
 * A radio list control.
 * @class
 * @extends React.Component
 */
export class RadioListControl extends React.Component<StringControlProps, void> {

  /** Handles the update event for this control. */
  onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    this.props.updateVariable(
      this.props.variable,
      (event.target as HTMLInputElement).value
    );
  }

  /** @override */
  shouldComponentUpdate(nextProps: StringControlProps) {
    return nextProps.variable !== this.props.variable;
  }

  /** @override */
  render() {
    const {
      title,
      key,
      possibleValues,
      selectedValue
    } = this.props.variable;
    const id = `${CSS.RMX_RADIO_LIST_ITEM}-${key}`;

    return (
      <div className={`${CSS.RMX_RADIO_LIST} ${CSS.MDL_LIST_ITEM}`}>
        <span className={CSS.MDL_PRIMARY}>{title}</span>
        <span className={CSS.MDL_SECONDARY}>
          {possibleValues.map((value: string, i: number) => (
            <label className={`${CSS.RMX_RADIO_LIST_ITEM} mdl-radio mdl-js-radio mdl-js-ripple-effect`}
              htmlFor={`${id}-${i}`} key={value}
            >
              <input type="radio" id={`${id}-${i}`}
                className="mdl-radio__button"
                name="options" value={value}
                checked={selectedValue === value}
                onChange={this.onChange}
              />
              <span className="mdl-radio__label">{value}</span>
            </label>
          ))}
        </span>
      </div>
    );
  }
}
