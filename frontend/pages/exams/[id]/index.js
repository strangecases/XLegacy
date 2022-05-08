import ExamNav from "../../../components/nav/ExamNav";
import Questions from "../../../components/questions/Questions";

const ExamsId = () => {
    return <Questions />;
};

ExamsId.getLayout = (page) => <ExamNav>{page}</ExamNav>;

export default ExamsId;
