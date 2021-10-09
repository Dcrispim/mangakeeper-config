import React, { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import i18n from "../../i18n";
import { MangaListType } from "../../types/MangasTypes";
import {
  download,
  getLocalFile,
  handleUpdateTitleList,
} from "../../utils/file";
import SideMenu from "../SideMenu";
import { HomePageContainer } from "./styles";

const GeneralPage: React.FC = () => {
  const [tab, setTab] = useState("import");

  return (
    <Row>
      <SideMenu tab={tab} onChange={setTab} />
      <Container className="col-10 d-flex align-items-center justify-content-center ">
        {tab === "import" ? (
          <ImportFile />
        ) : tab === "download" ? (
          <Download />
        ) : tab === "home" ? (
          <HomePage />
        ) : null}
      </Container>
    </Row>
  );
};

const ImportFile = () => {
  const [listToImport, setListToImport] = useState({} as MangaListType);
  const [importType, setImportType] = useState("1");
  const handleUpdateTitleList = (fr: FileReader) => {
    const newlistToImport: MangaListType = JSON.parse(String(fr.result));
    setListToImport(newlistToImport);
  };

  const handleChangeSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setImportType(evt.target.value);
  };

  const handleSubmit = () => {
    const {
      "mangakeeper.configs": config,
      "mangakeeper.lists": lists,
      ...titles
    } = listToImport;
    if (importType.toString() === "1") {
      localStorage.setItem("mangakeeper.toUpload", JSON.stringify(titles));
    }
    if (importType.toString() === "2") {
      localStorage.setItem("mangakeeper.toUpload", JSON.stringify(lists || {}));
    }
    if (importType.toString() === "3") {
      localStorage.setItem(
        "mangakeeper.toUpload",
        JSON.stringify(config || {})
      );
    }
    if (importType.toString() === "4") {
      localStorage.setItem(
        "mangakeeper.toUpload",
        JSON.stringify(listToImport || {})
      );
    }
    window.location.reload();
  };

  return (
    <Form.Group controlId="formFile" className="mb-3 col-6 ">
      <Form.Control
        type="file"
        onChange={getLocalFile(handleUpdateTitleList)}
        className="col-6"
      />
      <Form.Select
        value={importType}
        onChange={handleChangeSelect}
        aria-label="Default select example col-3"
      >
        <option value="1">{i18n("Only titles")}</option>
        <option value="2">{i18n("Only Lists")}</option>
        <option value="3">{i18n("Only Settings")}</option>
        <option value="4">{i18n("All")}</option>
      </Form.Select>
      <Button type="button" onClick={handleSubmit}>
        {i18n("Save")}
      </Button>
    </Form.Group>
  );
};

const Download = () => {
  const [exportType, setExportType] = useState("1");
  const handleSubmit = () => {
    const listToImport = JSON.parse(
      localStorage.getItem("mangakeeper.mangaList") || "{}"
    );
    const {
      "mangakeeper.configs": config,
      "mangakeeper.lists": lists,
      ...titles
    } = listToImport;
    if (exportType.toString() === "1") {
      download(
        JSON.stringify(titles),
        `Readerlist_titles-${new Date().getTime()}.json`,
        "json"
      );
    }
    if (exportType.toString() === "2") {
      download(
        JSON.stringify(lists || {}),
        `Readerlist_lists-${new Date().getTime()}.json`,
        "json"
      );
    }
    if (exportType.toString() === "3") {
      download(
        JSON.stringify(config || {}),
        `Readerlist_config-${new Date().getTime()}.json`,
        "json"
      );
    }
    if (exportType.toString() === "4") {
      localStorage.setItem(
        "mangakeeper.toUpload",
        JSON.stringify(listToImport || {})
      );
      download(
        JSON.stringify(listToImport || {}),
        `Readerlist-${new Date().getTime()}.json`,
        "json"
      );
    }
  };

  const handleChangeSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setExportType(evt.target.value);
  }

  const handleDownload = () => {};
  return (
    <Form.Group>
      <Button variant="secondary" onClick={handleSubmit} className="col-12">
        <img
          src="/mangakeeper-config/icons/import.png"
          alt="download"
          style={{ width: 24 }}
          className="mr-3 mb-2"
          title={i18n("Donwload")}
        />
      </Button>
      <Form.Select onChange={handleChangeSelect} defaultValue="1" aria-label="Default select example col-3">
        <option value="1">{i18n("Only titles")}</option>
        <option value="2">{i18n("Only lists")}</option>
        <option value="3">{i18n("Only Settings")}</option>
        <option value="4">{i18n("All")}</option>
      </Form.Select>

    </Form.Group>
  );
};

const HomePage = () => {
  const [statHomeList, setStartHomeList] = useState(
    getLocalConfigs()?.homelist
  );
  const [startonlyread, setStartonlyread] = useState(
    getLocalConfigs()?.startonlyread
  );
  const [onlyread, setOnlyread] = useState(getLocalConfigs()?.onlyread);
  const [tags, setTags] = useState<{ [tag: string]: number }>({});

  useEffect(() => {
    const mangaList: MangaListType = JSON.parse(
      localStorage.getItem("mangakeeper.mangaList") || "{}"
    );
    const tagTitles = Object.keys(mangaList).map((mangaName) =>
      mangaList[mangaName].categories?.map((t) => t.name)
    );
    setTags(
      tagTitles.reduce((tagList, tagnamelist) => {
        const newTagList = { ...tagList };
        tagnamelist?.forEach((_t) => {
          const t = i18n(_t);
          newTagList[t] = (newTagList[t] || 0) + 1;
        });

        return newTagList;
      }, {} as { [tag: string]: number })
    );
  }, []);

  const handleChangeHomeList = (e: React.FormEvent<HTMLSelectElement>) => {
    setStartHomeList(e.target.value);
  };

  const handleChangeOnlyRead = (e: React.FormEvent<HTMLInputElement>) => {
    setOnlyread(e.target.checked);
  };
  const handleChangeStartOnlyRead = (e: React.FormEvent<HTMLInputElement>) => {
    setStartonlyread(e.target.checked);
  };

  const handleSubmit = () => {
    handleChangeConfig("homelist", statHomeList);
    handleChangeConfig("startonlyread", startonlyread);
    handleChangeConfig("onlyread", onlyread === "null" ? false : onlyread);
    window.location.reload();
  };
  return (
    <HomePageContainer>
      <Form>
        <Form.Check
          type="switch"
          label={i18n("Show only read titles")}
          id="config-read-titles"
          onChange={handleChangeOnlyRead}
          checked={onlyread}
        />
        <Form.Check
          type="switch"
          id="config-start-only-read"
          label={i18n("Add only when starting to read")}
          checked={startonlyread}
          onChange={handleChangeStartOnlyRead}
        />
        <Row className="col-12">
          <FloatingLabel label={i18n("Display list:")} className="col-md-4">
            <Form.Select
              aria-label="Floating label select example"
              value={statHomeList}
              id="config-home-list"
              onChange={handleChangeHomeList}
            >
              <option>{i18n("Select the home page list")}</option>
              <option disabled>-------{i18n("Lists")}--------</option>
              <option disabled>-------{i18n("Tags")}--------</option>
              {Object.keys(tags)
                .sort((a, b) => (tags[a] > tags[b] ? -1 : 1))
                .map((tag) => (
                  <option key={`home-page-${tag}`} value={tag}>{`${i18n(
                    tag
                  )} (${tags[tag]})`}</option>
                ))}
            </Form.Select>
          </FloatingLabel>
          <div
            onClick={() => setStartHomeList("null")}
            className="col-1 m-0 p-0 row align-content-center justify-content-center"
          >
            <img
              src="/mangakeeper-config/icons/clear.png"
              alt="download"
              style={{ width: 48, height: 24 }}
              className="mr-3 mb-2"
              title={i18n("Donwload")}
            />
          </div>
        </Row>
        <Button type="button" onClick={handleSubmit}>
          {i18n("Save")}
        </Button>
      </Form>
    </HomePageContainer>
  );
};

const handleChangeConfig = (prop: string, value: string | number | boolean) => {
  const mangaList = JSON.parse(
    localStorage.getItem("mangakeeper.toUpload") || '{"mangakeeper.configs":{}}'
  );

  mangaList["mangakeeper.configs"][prop] = value;
  localStorage.setItem("mangakeeper.toUpload", JSON.stringify(mangaList));
};

const getLocalConfigs = () =>
  JSON.parse(
    localStorage.getItem("mangakeeper.mangaList") ||
      '{"mangakeeper.configs":{}}'
  )["mangakeeper.configs"];
export default GeneralPage;
