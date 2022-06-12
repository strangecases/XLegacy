import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import allActions from "../../store/actions";

const ModalCreateTest = ({
    children,
    onOk,
    isSubmitting,
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
    } = useSelector((state) => state.modals);

    let visible = false;

    if (path === "test") {
        visible = modalTestVisible;
    } else if (path === "section") {
        visible = modalSectionVisible;
    } else if (path === "deleteTest") {
        visible = popTestVisible;
        isDirty = true;
    } else if (path === "deleteSection") {
        visible = popSectionVisible;
        isDirty = true;
    }

    // const handleCancel = () => {
    //     console.log("Clicked cancel button");
    //     dispatch(allActions.modalActions.visibleNo());
    // };
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={onOk}
            confirmLoading={isSubmitting}
            onCancel={handleCancel}
            okButtonProps={{ disabled: !isDirty }}
            style={
                path === "deleteTest" || path === "deleteSection"
                    ? { top: 20 }
                    : {}
            }
        >
            {children}
        </Modal>
    );
};

export default ModalCreateTest;
