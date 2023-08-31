import Layout from '../components/layouts/Layout';
import Menus from '../components/content/Menus';
import Services from '../components/content/Services';
import Comments from '../components/content/Comments';
import Informations from '../components/content/Informations';
import NewsLetter from '../components/content/NewsLetter';

const PageHome = () => {
    return (
        <Layout
            title="Restaurante - Reserve sua mesa!"
            home
            label="Restaurante Saboroso!"
        >
            <Menus />

            <Services />

            <Comments />

            <Informations />

            <NewsLetter />
        </Layout>
    );
};

export default PageHome;
