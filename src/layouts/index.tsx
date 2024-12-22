import { Outlet, Link } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
        <nav>
            <Link to={'/'}>首页</Link>
        </nav>
      <Outlet />
    </div>
  );
}
