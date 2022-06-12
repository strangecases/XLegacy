import Questions from "../../../../../components/questions/Questions";

import AdminRoute from "../../../../../components/routes/AdminRoute";
import AdminIsAuthor from "../../../../../components/routes/AdminIsAuthor";

const Section = () => {
    return (
        <AdminIsAuthor>
            <Questions />
        </AdminIsAuthor>
    );
};

// Section.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default Section;
