import QuestionTests from "../../../../../components/Questions/QuestionTests";

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
