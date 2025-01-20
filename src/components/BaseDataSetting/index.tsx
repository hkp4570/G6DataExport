import React, {useMemo} from 'react';
import {useSelector} from 'dva';
import NodeSetting from './NodeSetting';
import EdgeSetting from './EdgeSetting';

const BaseDataSetting = () => {
    const menuR = useSelector((state:any) => state.project.menuR);
    const renderSettingComp = useMemo(() => {
        switch (menuR){
            case 'node':
                return <NodeSetting />;
            case 'edge':
                return <EdgeSetting />;
            default:
                return null;
        }
    },[menuR])
    return <div>
        {renderSettingComp}
    </div>
}

export default BaseDataSetting;