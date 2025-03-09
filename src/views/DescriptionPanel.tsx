import { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { useSigma } from "@react-sigma/core";

import Panel from "./Panel";

interface DescriptionPanelProps {
  selectedNode?: string | null;
}

// Interfejs dla definicji encji
interface Definition {
  text: string;
  strength: number;
}

const DescriptionPanel: FC<DescriptionPanelProps> = ({ selectedNode }) => {
  const sigma = selectedNode ? useSigma() : null;
  const graph = sigma?.getGraph();
  
  // Gdy mamy wybrany węzeł, pobieramy jego dane i wyświetlamy szczegóły
  if (selectedNode && graph && graph.hasNode(selectedNode)) {
    const nodeAttributes = graph.getNodeAttributes(selectedNode);
    const { label, entity_types, definitions } = nodeAttributes;
    
    // Sortujemy definicje według strength (malejąco)
    const sortedDefinitions: Definition[] = definitions && Array.isArray(definitions) 
      ? [...definitions].sort((a, b) => b.strength - a.strength)
      : [];
    
    return (
      <Panel
        initiallyDeployed
        title={
          <>
            <BsInfoCircle className="text-muted" /> Informacje o encji: {label}
          </>
        }
      >
        {entity_types && (
          <div className="node-detail">
            <h4>Typy encji:</h4>
            <p>{entity_types}</p>
          </div>
        )}
        
        {sortedDefinitions && sortedDefinitions.length > 0 ? (
          <div className="node-detail">
            <h4>Definicje:</h4>
            <ol className="definitions-list">
              {sortedDefinitions.map((def, index) => (
                <li key={index} className="definition-item">
                  <p>{def.text}</p>
                  <small className="strength-info">Siła definicji: {def.strength}</small>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p>Brak definicji dla tej encji.</p>
        )}
      </Panel>
    );
  }
  
  // Gdy nie ma wybranego węzła, wyświetlamy standardowy opis
  return (
    <Panel
      initiallyDeployed
      title={
        <>
          <BsInfoCircle className="text-muted" /> Description
        </>
      }
    >
      <p>
        This map represents a <i>network</i> of Wikipedia articles around the topic of "Data visualisation". Each{" "}
        <i>node</i> represents an article, and each edge a{" "}
        <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/See_also">
          "See also" link
        </a>
        .
      </p>
      <p>
        The seed articles were selected by hand by the{" "}
        <a target="_blank" rel="noreferrer" href="https://medialab.sciencespo.fr/">
          Sciences-Po médialab
        </a>{" "}
        team, and the network was crawled using{" "}
        <a target="_blank" rel="noreferrer" href="https://densitydesign.github.io/strumentalia-seealsology/">
          Seealsology
        </a>
        , and then cleaned and enriched manually. This makes the dataset creditable to both the médialab team and{" "}
        <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Wikipedia:Wikipedians">
          Wikipedia editors
        </a>
        .
      </p>
      <p>
        This web application has been developed by{" "}
        <a target="_blank" rel="noreferrer" href="https://www.ouestware.com/en/">
          OuestWare
        </a>
        , using{" "}
        <a target="_blank" rel="noreferrer" href="https://reactjs.org/">
          react
        </a>{" "}
        and{" "}
        <a target="_blank" rel="noreferrer" href="https://www.sigmajs.org">
          sigma.js
        </a>
        . You can read the source code{" "}
        <a target="_blank" rel="noreferrer" href="https://github.com/jacomyal/sigma.js/tree/main/packages/demo">
          on GitHub
        </a>
        .
      </p>
      <p>
        Nodes sizes are related to their{" "}
        <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Betweenness_centrality">
          betweenness centrality
        </a>
        . More central nodes (ie. bigger nodes) are important crossing points in the network. Finally, You can click a
        node to view more information about it.
      </p>
    </Panel>
  );
};

export default DescriptionPanel;
