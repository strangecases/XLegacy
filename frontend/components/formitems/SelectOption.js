import { Controller } from "react-hook-form";
import { Form, Select } from "antd";

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
}) => {
    return (
        <Form.Item
            // hasFeedback={errors[name]}
            help={errors[name] ? errors[name]?.message : ""}
            validateStatus={
                errors[name] && errors[name].message ? "error" : "success"
            }
            label={label}
        >
            <Controller
                render={({ field }) => (
                    <Select
                        defaultValue="Select"
                        {...field}
                        disabled={path === "edit"}
                        style={{ textAlign: "center" }}
                    >
                        {first && <Option value="0">{first}</Option>}
                        {list &&
                            list.map((ele) => {
                                return (
                                    <Option
                                        value={ele[check]}
                                        key={ele[check]}
                                        style={{ textAlign: "center" }}
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
