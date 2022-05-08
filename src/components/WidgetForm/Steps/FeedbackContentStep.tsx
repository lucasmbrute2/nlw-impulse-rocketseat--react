import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
	feedbackType: FeedbackType;
	onFeedbackRestartRequested: () => void;
	onFeedbackSent: () => void;
}

export function FeedbackContentStep({
	feedbackType,
	onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackContentStepProps) {
	const { image, title } = feedbackTypes[feedbackType];

	const [screenshot, setScreenshot] = useState<string | null>(null);
	const [comment, setComement] = useState("");

	function handleSubmitFeedback(e: FormEvent) {
		e.preventDefault();
		console.log({
			screenshot,
			comment,
		});

    onFeedbackSent()
	}

	return (
		<>
			<header>
				<button
					type="button"
					className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
					onClick={onFeedbackRestartRequested}
				>
					<ArrowLeft weight="bold" className="w-4 h-4" />
				</button>
				<span className="text-xl leading-6 flex items-center gap-2">
					<img
						src={image.source}
						alt={image.alt}
						className="w-6 h-6"
					/>
					{title}
				</span>
				<CloseButton />
			</header>

			<form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
				<textarea
					className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
					placeholder="Conte com detalhes o que está acontecendo"
					onChange={(e) => setComement(e.target.value)}
				/>
				<footer className="flex gap-2 mt-2">
					<ScreenshotButton
						screenshot={screenshot}
						onScreenshotTook={setScreenshot}
					/>

					<button
						disabled={!comment && !screenshot}
						type="submit"
						className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
					>
						Enviar feedback
					</button>
				</footer>
			</form>
		</>
	);
}
