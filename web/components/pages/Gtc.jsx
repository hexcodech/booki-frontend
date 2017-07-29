import React from "react";

const Gtc = () => {
	return (
		<div className="container">
			<h1>Datenschutzbestimmungen</h1>
			<p>
				hexcode (Die Entwickler von booki.me) sammelt alleinig anonymisierte
				Daten zur Analyse der Benutzerverhalten und zur Verbesserung der
				Dienstleistungen. Diese Daten werden <strong>nicht</strong> an Dritte
				weitergegeben.
			</p>
			<p>
				Dies kann auf{" "}
				<a href="https://github.com/hexcodech/" target="_blank">GitHub</a> auch
				überprüft werden, da die Software komplett Open Source ist.
			</p>
			<p>
				hexcode kann leider nicht garantieren, dass die Software zu 100% sicher
				ist. Was garantiert werden kann, ist, dass <strong>keine</strong>{" "}
				bewusste Schwachstellen, sogenannte Backdoors, eingebaut sind. Sollte
				eine Schwachstelle gefunden werden, wird versucht diese möglichst bald
				zu beheben.
			</p>
			<p>
				Die Passwörter werden mit einem zufälligen <i>Salt</i> vermischt und als
				SHA-512 Hash gespeichert. Diese bietet einen sehr grossen Schutz, selbst
				wenn die Server gehacket werden sollten. Gleichzeitig bedeutet dies,
				dass hexcode keine Passwörter lesen kann.
			</p>
			<h1>Allgemeine Geschäftsbedingungen</h1>
		</div>
	);
};

export default Gtc;
