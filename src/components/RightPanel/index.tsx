import React from 'react';
import styles from './index.less';
import {Tabs} from 'antd';

const RightPanel = () => {
    return (
        <div className={styles.right_panel}>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="基础设置" key="baseSetting">
                    基础设置
                </Tabs.TabPane>
                <Tabs.TabPane tab="数据" key="dataSetting">
                    数据
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default RightPanel;
