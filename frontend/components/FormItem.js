import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

const { TextArea } = Input;

const FormItem = ({ errors, name, control, placeholder, type, width = "" }) => {
    return (
        <Form.Item
            hasFeedback={errors[name]}
            help={errors[name] ? errors[name]?.message : ""}
            validateStatus={errors[name] ? "error" : "success"}
        >
            <Controller
                render={({ field }) =>
                    name !== "password" ? (
                        <TextArea
                            type={type}
                            allowClear
                            {...field}
                            placeholder={placeholder}
                            autoSize
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

export default FormItem;
