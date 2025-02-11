async function createOverlay() {
	const overlay = document.createElement('div');

	overlay.id = 'category-overlay';

	overlay.innerHTML = `
        <div class="overlay-content">
            <div class="left-section">
                <div class="id-circle" id="overlay-category-id"></div>
                <span class="category-title" id="overlay-category-title"></span>
            </div>
            <div class="right-section">
                <span id="overlay-current-page"></span> of <span id="overlay-total-pages"></span>
                <button id="stop-btn">Stop Scrape</button>
                <button id="skip-btn">Skip Scrape</button>
            </div>
        </div>
        <div class="bottom-section">
            <button id="copy-link-btn">📋</button>
            <input type="text" id="overlay-category-url" readonly>
        </div>
    `;

	document.body.appendChild(overlay);

	const style = document.createElement('style');

	style.innerHTML = `
        /* Overlay container */
        #category-overlay {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 5px;
            font-family: Arial, sans-serif;
            font-weight: normal;
			display: flex;
            flex-direction: column;
            align-items: stretch;
            z-index: 9999;
        }

        /* Top row layout */
        .overlay-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 8px;
        }

        /* Left section: ID + Title */
        .left-section {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        /* Reversed Circle for ID */
        .id-circle {
            border-radius: 5px;
            background: white;
            color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            padding: 5px;
            font-weight: bold;
        }

        /* Category title */
        .category-title {
            font-size: 14px;
        }

        /* Right section: Page Number */
        .right-section {
            font-size: 14px;
        }

        /* Bottom section: URL bar with copy button */
        .bottom-section {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        /* Copy button */
        #copy-link-btn {
            background: white;
            color: black;
            border: none;
            cursor: pointer;
            padding: 5px 10px;
            font-size: 13px;
            border-radius: 5px;
        }

        #skip-btn, #stop-btn {
            background: white;
            color: black;
            border: none;
            cursor: pointer;
            padding: 3px 6px;
            font-size: 12px;
            font-weight: bold;
            border-radius: 2px;
            margin: 1px 4px;
        }

        /* Monospace input for URL */
        #overlay-category-url {
            flex-grow: 1;
            font-family: monospace;
            font-size: 14px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            padding: 5px;
            border-radius: 3px;
            text-overflow: ellipsis;
            outline: none;
        }
    `;

	document.head.appendChild(style);

	document.getElementById('copy-link-btn').addEventListener('click', () => {
		const urlInput = document.getElementById('overlay-category-url')
		urlInput.select();
		// noinspection JSDeprecatedSymbols
		document.execCommand('copy')
	});

	document.getElementById('stop-btn').addEventListener('click', async () => {
		await window.postMessage({scope: 'digikey', action: 'stopScrape'})
	});

	document.getElementById('skip-btn').addEventListener('click', async () => {
		await window.postMessage({scope: 'digikey', action: 'skipScrape'})
	});
}

const updateOverlay = async (categoryId, cTitle, cPage, totalPages, cPageUrl) => {
	if (!document.getElementById('category-overlay')) {
		await createOverlay()
	}

	document.getElementById('overlay-category-id').textContent = categoryId;
	document.getElementById('overlay-category-title').textContent = cTitle;
	document.getElementById('overlay-category-url').value = cPageUrl;
	document.getElementById('overlay-current-page').textContent = `Page ${cPage}`;
	document.getElementById('overlay-total-pages').textContent = `${totalPages}`;
};

module.exports = {updateOverlay}
