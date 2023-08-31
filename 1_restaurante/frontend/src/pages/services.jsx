import Comments from '../components/content/Comments';
import NewsLetter from '../components/content/NewsLetter';
import Services from '../components/content/Services';
import Layout from '../components/layouts/Layout';

const PageServices = () => {
    return (
        <Layout
            title="Nossos serviços"
            services
            label="É um prazer poder servir!"
        >
            <Services />

            <Comments />

            <NewsLetter />
        </Layout>
    );
};

export default PageServices;
