import { motion } from "framer-motion";
import cx from "classnames";
import confetti from "canvas-confetti";

export default function ThanksPage() {
	function hanldeConfetti() {
		confetti({
			particleCount: 140,
			angle: 60,
			spread: 55,
			origin: { x: 0 },
		});
		// and launch a few from the right edge
		confetti({
			particleCount: 140 ,
			angle: 120,
			spread: 55,
			origin: { x: 1 },
		});
	}
	return (
		<main className="overflow-hidden max-w-screen bg-[#f8edde] min-h-screen text-black font-montserrat subpixel-antialiased pb-8 md:px-0 ">
			<div className="mt-8 w-full grid grid-cols-2 font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl border-t-4  border-b-4 border-black ">
				<div
					className={cx(
						"col-span-1 outline-title flex items-center justify-end bg-[#b918e7] text-[#46e718] py-3 px-3 border-r-2 border-black"
					)}
					style={{
						textShadow:
							"-1px 0 black, 0 -1px black, 1px 0 black, 0 1px black, 1px 1px black, -1px -1px black, -1px 1px black, 1px -1px black, 2.5px 2.5px black",
						strokeLinejoin: "round",
					}}
				>
					<motion.span animate={{ x: 0 }} initial={{ x: -100 }}>
						CODDY
					</motion.span>
				</div>
				<div
					className="col-span-1 flex items-center justify-start bg-[#46e718] text-[#b918e7] py-3  px-3 border-l-2 border-black"
					style={{
						textShadow:
							"-1px 0 black, 0 -1px black, 1px 0 black, 0 1px black, 1px 1px black, -1px -1px black, -1px 1px black, 1px -1px black, 2.5px 2.5px black",
					}}
				>
					<motion.span animate={{ x: 0 }} initial={{ x: 100 }}>
						FORMS
					</motion.span>
				</div>
			</div>
			<section className="px-4">
				<motion.div
					className="lg:w-5/12 md:w-7/12 h-fit bg-white rounded-xl mx-auto mt-4 overflow-hidden border-4 border-black"
					animate={{ scale: 1 }}
					initial={{ scale: 0 }}
					transition={{
						type: "spring",
						stiffness: 260,
						damping: 20,
						duration: 2,
					}}
					style={{
						boxShadow: "2px 2px 0px black",
					}}
					onAnimationComplete={hanldeConfetti}
				>
					<img
						src="https://media1.giphy.com/media/Od0QRnzwRBYmDU3eEO/giphy.gif?cid=ecf05e47fq6e40y8m7c7vil3bub5wunza7b86xy6mc1bcxva&rid=giphy.gif&ct=g"
						className="aspect-square w-full block"
					></img>
					<h2
						className="text-4xl font-black tracking-wide text-center my-4"
						style={{
							textShadow: "2px 2px 0px #b918e7",
							"-webkit-text-stroke": "1px #46e718",
							"paint-order": "stroke fill",
						}}
					>
						Спасибооо!!!!
					</h2>
				</motion.div>
			</section>
		</main>
	);
}
