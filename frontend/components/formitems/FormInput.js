import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

// const { TextArea } = Input;

const FormInput = ({
    errors = {},
    name,
    control,
    placeholder,
    type,
    width = "",
    label = "",
    labelColmn = "",
    wrapperColmn = "",
    redLabel = true,
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
            labelCol={
                labelColmn && {
                    sm: { span: 24 },
                    md: { span: labelColmn + 4 },
                    lg: { span: labelColmn + 2 },
                    xl: { span: labelColmn },
                }
            }
            wrapperCol={
                wrapperColmn && {
                    sm: { span: 24 },
                    md: { span: wrapperColmn - 4 },
                    lg: { span: wrapperColmn - 2 },
                    xl: { span: wrapperColmn },
                }
            }
        >
            <Controller
                render={({ field }) =>
                    type !== "password" ? (
                        <Input
                            type={type}
                            {...field}
                            placeholder={placeholder}
                            allowClear
                            style={{ width }}
                        />
                    ) : (
                        <Input.Password {...field} placeholder={placeholder} />
                    )
                }
                name={name}
                control={control}
            />
        </Form.Item>
    );
};

export default FormInput;
