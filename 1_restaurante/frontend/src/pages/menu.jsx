import Comments from '../components/content/Comments';
import Menus from '../components/content/Menus';
import NewsLetter from '../components/content/NewsLetter';
import Layout from '../components/layouts/Layout';

const PageMenu = () => {
    return (
        <Layout title="Veja nosso menu." menu label="Saboreie nosso menu!">
            <Menus />

            <Comments />

            <NewsLetter />
        </Layout>
    );
};

export default PageMenu;
