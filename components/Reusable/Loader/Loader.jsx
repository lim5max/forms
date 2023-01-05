import styles from "./Loader.module.css";

import { memo } from "react";

const Loader = () => {
	//create React Loading screen
	return (
		<div className="fixed z-50 max-w-screen max-h-screen inset-0 bg-green/50  flex items-center justify-center overflow-hidden">
			<span className={styles.loader}></span>
		</div>
	);
};

export default memo(Loader);
