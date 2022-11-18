import { Layout } from "antd";
import ExamNavNew from "../../../../components/nav/ExamNavNew";
import ShowTest from "../../../../components/adminUtil/ShowTests";
import examInfoStyle from "../../../../styles/modules/pageStyles/ExamInfo.module.css";

const Exams = () => {
    return (
        <Layout className={examInfoStyle["exam-layout"]}>
            <ShowTest type="exam" />;
        </Layout>
    );
};

Exams.getLayout = (page) => <ExamNavNew type="intro">{page}</ExamNavNew>;

export default Exams;
