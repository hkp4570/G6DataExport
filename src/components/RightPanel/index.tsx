import React, {useState} from 'react';
import styles from './index.less';
import {Tabs} from 'antd';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

const RightPanel = () => {
    const [jsonData, setJsonData] = useState({"name":"hkp","age":18});
    const handleChangeJson = (data) => {
        console.log(data, 'data')
    }
    return (
        <div className={styles.right_panel}>
            <Tabs defaultActiveKey="dataSetting">
                <Tabs.TabPane tab="基础设置" key="baseSetting">
                    基础设置
                </Tabs.TabPane>
                <Tabs.TabPane tab="数据" key="dataSetting">
                    <Editor
                        value={jsonData}
                        onChange={handleChangeJson}
                        mode={'code'}
                    />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default RightPanel;
