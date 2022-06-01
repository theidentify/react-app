import Html from './Html';
import Layout from './Layout';

export default function App() {
  return (
    <Html title='React App' assets={{}}>
      <div>Hello react app1</div>
      <Layout>
        <div>Hello react app</div>
      </Layout>
    </Html>
  );
}
