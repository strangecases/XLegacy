import { useSelector } from "react-redux";
import { Modal } from "antd";
import modalStyle from "../../styles/modules/componentStyles/Modal.module.css";

const ModalCreate = ({
    children,
    onOk,
    isDirty,
    title,
    handleCancel,
    path = "test",
}) => {
    const {
        modalTestVisible,
        modalSectionVisible,
        popTestVisible,
        popSectionVisible,
        popSchoolVisible,
    } = useSelector((state) => state.modals);

    const { modalOkLoading, deleteLoading } = useSelector(
        (state) => state.load
    );

    let visible = false;
    let loading = false;

    // if (path === "test") {
    //     visible = modalTestVisible;
    // } else if (path === "section") {
    //     visible = modalSectionVisible;
    // } else if (path === "deleteTest") {
    //     visible = popTestVisible;
    //     isDirty = true;
    // } else if (path === "deleteSection") {
    //     visible = popSectionVisible;
    //     isDirty = true;
    // } else if (path === "deleteSchool") {
    //     visible = popSchoolVisible;
    //     isDirty = true;
    // }

    switch (path) {
        case "test":
            visible = modalTestVisible;
            loading = modalOkLoading;
            break;
        case "section":
            visible = modalSectionVisible;
            loading = modalOkLoading;
            break;
        case "deleteTest":
            visible = popTestVisible;
            loading = deleteLoading;
            isDirty = true;
            break;
        case "deleteSection":
            visible = popSectionVisible;
            loading = deleteLoading;
            isDirty = true;
            break;
        case "deleteSchool":
            visible = popSchoolVisible;
            loading = deleteLoading;
            isDirty = true;
            break;
        default:
            visible = false;
    }

    // const handleCancel = () => {
    //     console.log("Clicked cancel button");
    //     dispatch(allActions.modalActions.visibleNo());
    // };
    return (
        <Modal
            title={title}
            // visible={visible}
            open={visible}
            onOk={onOk}
            confirmLoading={loading}
            onCancel={handleCancel}
            okButtonProps={{ disabled: !isDirty }}
            className={
                path === "deleteTest" ||
                path === "deleteSection" ||
                path === "deleteSchool"
                    ? modalStyle["modal-top"]
                    : modalStyle["modal-test"]
            }
        >
            {children}
        </Modal>
    );
};

export default ModalCreate;
