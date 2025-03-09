"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const bs_1 = require("react-icons/bs");
const core_1 = require("@react-sigma/core");
const Panel_1 = tslib_1.__importDefault(require("./Panel"));
const RelationsPanel = ({ selectedNode }) => {
    const sigma = selectedNode ? (0, core_1.useSigma)() : null;
    const graph = sigma === null || sigma === void 0 ? void 0 : sigma.getGraph();
    if (!selectedNode || !graph || !graph.hasNode(selectedNode)) {
        return null;
    }
    const nodeAttributes = graph.getNodeAttributes(selectedNode);
    const { label, relations } = nodeAttributes;
    if (!relations || !Array.isArray(relations) || relations.length === 0) {
        return ((0, jsx_runtime_1.jsx)(Panel_1.default, { title: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(bs_1.BsLink45Deg, { className: "text-muted" }), " Relacje: ", label] }), children: (0, jsx_runtime_1.jsx)("p", { children: "Brak relacji dla tej encji." }) }));
    }
    const groupedRelations = [];
    relations.forEach((relation) => {
        const existingGroupIndex = groupedRelations.findIndex((group) => group.source === relation.source && group.target === relation.target);
        if (existingGroupIndex >= 0) {
            groupedRelations[existingGroupIndex].descriptions.push({
                text: relation.description,
                strength: relation.strength,
                is_reverse: relation.is_reverse
            });
        }
        else {
            groupedRelations.push({
                source: relation.source,
                target: relation.target,
                descriptions: [{
                        text: relation.description,
                        strength: relation.strength,
                        is_reverse: relation.is_reverse
                    }]
            });
        }
    });
    const sortedGroups = [...groupedRelations].sort((a, b) => {
        if (a.source === selectedNode && b.source !== selectedNode)
            return -1;
        if (a.source !== selectedNode && b.source === selectedNode)
            return 1;
        return 0;
    });
    return ((0, jsx_runtime_1.jsx)(Panel_1.default, { title: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(bs_1.BsLink45Deg, { className: "text-muted" }), " Relacje: ", label] }), children: (0, jsx_runtime_1.jsx)("div", { className: "relations-list", children: sortedGroups.map((group, groupIndex) => {
                const sortedDescriptions = [...group.descriptions].sort((a, b) => b.strength - a.strength);
                const isOutgoing = group.source === selectedNode;
                const otherNode = isOutgoing ? group.target : group.source;
                return ((0, jsx_runtime_1.jsxs)("div", { className: "relation-group", children: [(0, jsx_runtime_1.jsx)("h4", { children: isOutgoing ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "relation-direction outgoing", children: "\u2192" }), otherNode] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "relation-direction incoming", children: "\u2190" }), otherNode] })) }), (0, jsx_runtime_1.jsx)("ul", { className: "relation-descriptions", children: sortedDescriptions.map((desc, descIndex) => ((0, jsx_runtime_1.jsxs)("li", { className: "relation-description", children: [(0, jsx_runtime_1.jsx)("p", { children: desc.text || "Brak opisu relacji" }), desc.strength > 0 && ((0, jsx_runtime_1.jsxs)("small", { className: "strength-info", children: ["Si\u0142a relacji: ", desc.strength] }))] }, descIndex))) })] }, groupIndex));
            }) }) }));
};
exports.default = RelationsPanel;
//# sourceMappingURL=RelationsPanel.js.map