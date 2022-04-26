import { Button, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { CloseCircleFilled } from "@ant-design/icons";
import allActions from "../../../store/actions";
import ModalCreateTest from "../ModalCreate";

const DeleteSectionForm = ({ section }) => {
    const { tests } = useSelector((state) => state);

    const dispatch = useDispatch();

    const router = useRouter();

    // const showPopConfirm = () => {
    //     dispatch(allActions.customActions.visibleDeleteSectionYes());
    // };

    const onSubmit = async () => {
        console.log("section delete");
        dispatch(allActions.customActions.visibleDeleteSectionNo());
    };

    const onHandleCancel = () => {
        console.log("Clicked cancel button");
        dispatch(allActions.customActions.visibleDeleteSectionNo());
    };

    return (
        <>
            {/* <Tooltip title="Delete Section" placement="topLeft" color="red">
                <Button
                    style={{ borderStyle: "none" }}
                    shape="circle"
                    onClick={showPopConfirm}
                    icon={
                        <CloseCircleFilled
                            style={{
                                fontSize: 20,
                                color: "#939090",
                                paddingTop: 5,
                            }}
                            className="hover-icon-delete"
                        />
                    }
                    size="small"
                />
            </Tooltip> */}
            {section && (
                <ModalCreateTest
                    style={{ top: 20 }}
                    onOk={onSubmit}
                    title="Delete Section"
                    handleCancel={onHandleCancel}
                    path="deleteSection"
                >
                    <p>Warning! You sure u want to delete this test</p>
                    <p>{section.sectionNo}</p>
                </ModalCreateTest>
            )}
        </>
    );
};

export default DeleteSectionForm;
