import QuestionTests from "../../../../../components/questions/QuestionTests";

import AdminIsAuthor from "../../../../../components/routes/AdminIsAuthor";

const Section = () => {
    return (
        <AdminIsAuthor>
            <QuestionTests />
        </AdminIsAuthor>
    );
};

// Section.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default Section;
