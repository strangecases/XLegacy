import { Controller } from "react-hook-form";
import { Input } from "antd";

const { TextArea } = Input;

const ControllerInput = ({ control, name }) => {
    return (
        <Controller
            render={({ field }) => (
                <TextArea
                    type="text"
                    allowClear
                    {...field}
                    placeholder="Enter Option"
                    autoSize
                    style={{
                        width: "25vw",
                    }}
                />
            )}
            name={name}
            control={control}
            error={{}}
        />
    );
};

export default ControllerInput;
