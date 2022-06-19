import { Controller } from "react-hook-form";
import { Form, Select } from "antd";
import modalStyle from "../../styles/modules/componentStyles/Modal.module.css";

const { Option } = Select;

const SelectOption = ({
    errors = {},
    name,
    control,
    list,
    path = "",
    label = "",
    first = "",
    check = "",
    redLabel = false,
}) => {
    return (
        <Form.Item
            // hasFeedback={errors[name]}
            help={errors[name] ? errors[name]?.message : ""}
            validateStatus={
                errors[name] && errors[name].message ? "error" : "success"
            }
            label={label}
            required={redLabel}
        >
            <Controller
                render={({ field }) => (
                    <Select
                        defaultValue="Select"
                        {...field}
                        disabled={path === "edit"}
                        className={modalStyle["select-options"]}
                    >
                        {first && <Option value="0">{first}</Option>}
                        {list &&
                            list.map((ele) => {
                                return (
                                    <Option
                                        value={ele[check]}
                                        key={ele[check]}
                                        className={modalStyle["select-options"]}
                                    >
                                        {ele[check]}
                                    </Option>
                                );
                            })}
                    </Select>
                )}
                name={name}
                control={control}
            />
        </Form.Item>
    );
};

export default SelectOption;
