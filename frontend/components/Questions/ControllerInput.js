import { Controller } from "react-hook-form";
import { Input } from "antd";
import questionStyle from "../../styles/modules/componentStyles/Questions.module.css";

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
                    className={questionStyle["controller-input"]}
                />
            )}
            name={name}
            control={control}
            error={{}}
        />
    );
};

export default ControllerInput;
