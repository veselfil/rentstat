"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const dbFilename = "fuck-idealni-najemnik.sqlite";
const baseUrl = "https://www.sreality.cz/api/cs/v2/estates";
const websiteLinkTemplate = "https://www.sreality.cz/detail/pronajem/byt/what/thefuck/{0}";
const estatesPath = "/api/cs/v2/estates";
const dbHandle = new sqlite3_1.default.Database(dbFilename);
const lookups = {
    "1kk": "category_sub_cb=2&category_type_cb=2",
    "1+1": "category_sub_cb=3&category_type_cb=2",
    "2kk": "category_sub_cb=4&category_type_cb=2",
    "2+1": "category_sub_cb=5&category_type_cb=2",
    "3kk": "category_sub_cb=6&category_type_cb=2",
    "3+1": "category_sub_cb=7&category_type_cb=2"
};
function insertIntoDb(db, property) {
    const statement = db.prepare("INSERT INTO (title, sqm, rooms, isKk, lat, long) VALUES (?, ?, ?, ?, ?, ?)");
    statement.run(property.name);
}
const promises = Object.keys(lookups).map((key) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchAllPages(lookups[key]);
}));
function formatUrl(params) {
    return `${baseUrl}?${params}`;
}
function fetchAllPages(queryParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseUrl = formatUrl(queryParam);
        const perPage = 50;
        let hasNextPage = true;
        let total = 0;
        let page = 0;
        while (hasNextPage) {
            const response = yield (0, node_fetch_1.default)(baseUrl + `&page=${page}&per_page=${perPage}`);
            const content = yield response.json();
            total = content.result_size;
            content._embedded.estates.forEach((property) => __awaiter(this, void 0, void 0, function* () {
                yield handleProperty(property);
            }));
            hasNextPage = (1 + page) * perPage < total;
            page++;
        }
    });
}
function handleProperty(property) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(property.name);
    });
}
