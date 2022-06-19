import { Spin } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import allComponentsStyle from "../styles/modules/componentStyles/AllComponents.module.css";

const Spinner = () => {
    return (
        <Spin
            size="large"
            className={allComponentsStyle["all-spin-position"]}
            indicator={
                <SyncOutlined
                    spin
                    className={allComponentsStyle["all-spin-icon"]}
                />
            }
        />
    );
};

export default Spinner;
