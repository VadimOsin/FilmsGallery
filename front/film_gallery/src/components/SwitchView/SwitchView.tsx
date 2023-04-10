import React, {useEffect} from 'react';
import './SwitchView.css'

interface ISwitchView {
    switchView: boolean,
    setSwitchView: (switchView: boolean) => void
}

const SwitchView: React.FC<ISwitchView> = ({
                                               switchView, setSwitchView
                                           }) => {
    useEffect(() => {
        console.log(switchView)
    })
    return (
        <label className="toggle-control">
            <input type="checkbox" checked={switchView} onChange={(event) => setSwitchView(event.target.checked)}/>
            <span className="control">
                <div className="control__list">
                      <svg width="25px" height="25px" viewBox="0 0 17 17" version="1.1"
                           xmlns="http://www.w3.org/2000/svg">
	<path
        d="M0 5h5v-5h-5v5zM1 1h3v3h-3v-3zM6 5h5v-5h-5v5zM7 1h3v3h-3v-3zM12 0v5h5v-5h-5zM16 4h-3v-3h3v3zM0 11h5v-5h-5v5zM1 7h3v3h-3v-3zM6 11h5v-5h-5v5zM7 7h3v3h-3v-3zM12 11h5v-5h-5v5zM13 7h3v3h-3v-3zM0 17h5v-5h-5v5zM1 13h3v3h-3v-3zM6 17h5v-5h-5v5zM7 13h3v3h-3v-3zM12 17h5v-5h-5v5zM13 13h3v3h-3v-3z"
        fill="#000000"/>
</svg>
                     <svg width="30px" height="30px" viewBox="0 0 17 17" version="1.1"
                          xmlns="http://www.w3.org/2000/svg">
	<path d="M10 4h5.826v1h-5.826v-1z" fill="#000000"/>
	<path d="M10 7.996h3.497v1h-3.497v-1z" fill="#000000"/>
	<path d="M10.009 5.998h6.991v1h-6.991v-1z" fill="#000000"/>
	<path d="M10 9.993h6.991v1h-6.991v-1z" fill="#000000"/>
	<path d="M10 12h5.826v1h-5.826v-1z" fill="#000000"/>
	<path d="M0 13h9v-9h-9v9zM1 5h7v7h-7v-7z" fill="#000000"/>
</svg>
                </div>
            </span>
        </label>
    );
};

export default SwitchView;