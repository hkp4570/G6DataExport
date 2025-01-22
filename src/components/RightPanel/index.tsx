import React, {Children, useEffect, useMemo, useState} from 'react';
import styles from './index.less';
import {Tabs, Button} from 'antd';
import {JsonEditor as Editor} from 'jsoneditor-react';
import {useDispatch} from 'dva';
import BaseDataSetting from '../BaseDataSetting';
import 'jsoneditor-react/es/editor.min.css';
import { useGetReduxData } from '@/hooks';

const RightPanel = () => {
    const dispatch = useDispatch();
    const { currentComponent, menuR } = useGetReduxData();
    const [jsonData, setJsonData] = useState(currentComponent);
    const handleChangeJson = (data) => {
        dispatch({
            type: 'project/setG6Data',
            payload: {
                value: data,
            }
        })
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

    const exportData = () => {
        // Step 2: Convert to JSON string
        const jsonString = JSON.stringify(currentComponent, null, 2); // The second parameter 'null' and third parameter '2' are used for pretty printing
    
        // Step 3: Create a Blob object
        const blob = new Blob([jsonString], { type: "application/json" });
    
        // Step 4: Create URL for Blob
        const url = URL.createObjectURL(blob);
    
        // Step 5: Create a link and set the URL using the Blob URL
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json'; // The file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    
        // Release URL object
        URL.revokeObjectURL(url);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    const items = useMemo(() => {
        return [
            {
                key:'baseSetting',
                label: '基础设置',
                children: <BaseDataSetting />,
                disabled: menuR === 'data'
            },
            {
                key: 'dataSetting',
                label: '数据',
                children: <>
                        <Button type='primary' style={{marginBottom: '16px'}} size='small' onClick={exportData}>导出数据</Button>
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
                    </>
            }
        ]
    }, [menuR])

    return (
        <div className={styles.right_panel}>
            <Tabs defaultActiveKey={menuR === 'data' ? 'dataSetting' : "baseSetting"} destroyInactiveTabPane items={items}></Tabs>
        </div>
    );
};
export default React.memo(RightPanel);
