import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import allActions from "../../../store/actions";
import ModalCreate from "../ModalCreate";

const DeleteSectionForm = () => {
    const { selectedSectionNo } = useSelector((state) => state.custom);

    const dispatch = useDispatch();

    const router = useRouter();
    const { id, testId } = router.query;

    // const showPopConfirm = () => {
    //     dispatch(allActions.modalActions.visibleDeleteSectionYes());
    // };

    const onSubmit = async () => {
        dispatch(allActions.testActions.deleteSectionOnTest(id, testId));
    };

    const onHandleCancel = () => {
        // console.log("Clicked cancel button");
        dispatch(allActions.modalActions.visibleDeleteSectionNo());
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

            <ModalCreate
                onOk={onSubmit}
                title="Delete Section"
                handleCancel={onHandleCancel}
                path="deleteSection"
            >
                <p>Warning! You sure u want to delete this section with</p>
                <p>section number : {selectedSectionNo}</p>
            </ModalCreate>
        </>
    );
};

export default DeleteSectionForm;
