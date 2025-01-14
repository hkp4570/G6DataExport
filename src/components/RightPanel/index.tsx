import React, {useEffect} from 'react';
import styles from './index.less';
import {Tabs} from 'antd';
import {JsonEditor as Editor} from 'jsoneditor-react';
import {useSelector} from 'dva';
import 'jsoneditor-react/es/editor.min.css';

const RightPanel = () => {
    const currentComponent = useSelector((state: any) => state.project.currentComponent);

    const handleChangeJson = (data) => {
        console.log(data, 'data')
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            // 获取当前的文本框
            const textarea = event.target as HTMLTextAreaElement;
            if (textarea && textarea.tagName === 'TEXTAREA') {
                // 获取光标位置
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                // 设置新的值并移动光标
                textarea.value = textarea.value.substring(0, start)
                    + '  ' // 插入Tab符，可能需要使用空格来代替
                    + textarea.value.substring(end);

                // 将光标移到Tab符之后
                textarea.selectionStart =
                    textarea.selectionEnd = start + 1; // +1 或者根据你的制表符宽度设置
            }
            return false;
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return (
        <div className={styles.right_panel}>
            <Tabs defaultActiveKey="dataSetting">
                <Tabs.TabPane tab="基础设置" key="baseSetting">
                    基础设置
                </Tabs.TabPane>
                <Tabs.TabPane tab="数据" key="dataSetting" style={{height: '600px'}}>
                    <Editor
                        value={currentComponent}
                        onChange={handleChangeJson}
                        mode={'code'}
                        navigationBar={false}
                        statusBar={false}
                        search={false}
                        history={false}
                        sortObjectKeys={false}
                        htmlElementProps={{className: 'json_editor'}}
                    />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};
export default RightPanel;
