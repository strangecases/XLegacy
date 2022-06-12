import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

const { TextArea } = Input;

const FormOption = ({
    errors,
    name,
    option,
    control,
    placeholder,
    type,
    width = "",
}) => {
    return (
        <Form.Item
            // hasFeedback={
            //     errorRef.current.options && errorRef.current.options[option]
            // }
            help={
                errors.options && errors.options[option]
                    ? errors.options[option]?.message
                    : ""
            }
            validateStatus={
                errors.options && errors.options[option] ? "error" : "success"
            }
        >
            <Controller
                render={({ field }) => (
                    <TextArea
                        type={type}
                        allowClear
                        {...field}
                        placeholder={placeholder}
                        autoSize
                        style={{ width }}
                    />
                )}
                name={name}
                control={control}
            />
        </Form.Item>
    );
};

export default FormOption;
