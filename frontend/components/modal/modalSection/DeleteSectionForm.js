import { Button, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { CloseCircleFilled } from "@ant-design/icons";
import allActions from "../../../store/actions";
import ModalCreateTest from "../ModalCreate";

const DeleteSectionForm = () => {
    const { tests } = useSelector((state) => state);
    const { selectedSectionNo, selectedSectionId } = useSelector(
        (state) => state.custom
    );

    const dispatch = useDispatch();

    const router = useRouter();
    const { id } = router.query;

    // const showPopConfirm = () => {
    //     dispatch(allActions.customActions.visibleDeleteSectionYes());
    // };

    const onSubmit = async () => {
        const res = await axios.delete(
            `/api/prepare/tests/${id}/sections/${selectedSectionId}`
        );
        console.log(res.data.sectionNo);
        if (res.data.sectionNo < tests[id].sectionData.length) {
            console.log("sections update");
            console.log(tests[id].sectionData.slice(res.data.sectionNo));
            tests[id].sectionData
                .slice(res.data.sectionNo)
                .forEach(async (sect) => {
                    console.log(sect);
                    const sectionNum = sect.sectionNo - 1;
                    const sectionData = { ...sect, sectionNo: sectionNum };
                    console.log(sectionData);
                    await axios.patch(
                        `/api/prepare/tests/${id}/sections/${sect.sectionId}`,
                        sectionData
                    );
                });
        }
        dispatch(allActions.customActions.visibleDeleteSectionNo());
        router.push(`/tests/${id}`);
        console.log("finish");
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

            <ModalCreateTest
                style={{ top: 20 }}
                onOk={onSubmit}
                title="Delete Section"
                handleCancel={onHandleCancel}
                path="deleteSection"
            >
                <p>Warning! You sure u want to delete this section with</p>
                <p>section number : {selectedSectionNo}</p>
            </ModalCreateTest>
        </>
    );
};

export default DeleteSectionForm;
