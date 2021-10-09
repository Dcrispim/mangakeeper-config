import React, { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import i18n from "../../i18n";
import { MangaListType } from "../../types/MangasTypes";
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
  return (
    <Form.Group controlId="formFile" className="mb-3 col-6 ">
      <Form.Control type="file" id="config-upload-mangas" className="col-6" />
      <Form.Select defaultValue="1" aria-label="Default select example col-3">
        <option value="1">{i18n("Only titles")}</option>
        <option value="2">{i18n("Only Tags")}</option>
        <option value="3">{i18n("Only Settings")}</option>
        <option value="4">{i18n("All")}</option>
      </Form.Select>
    </Form.Group>
  );
};

const Download = () => {
  return (
    <Form.Group>
      <Button variant="secondary" className="col-12">
        <img
          src="/mangakeeper-config/icons/import.png"
          alt="download"
          style={{ width: 24 }}
          className="mr-3 mb-2"
          title={i18n("Donwload")}
        />
      </Button>
      <Form.Select defaultValue="1" aria-label="Default select example col-3">
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
    JSON.parse(localStorage.getItem("mangakeeper.configs") || "{}")?.homelist
  );
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
    handleChangeConfig("homelist", e.target.value);
  };

  const handleChangeOnlyRead = (e: React.FormEvent<HTMLInputElement>) => {
    handleChangeConfig("onlyread", e.target.checked);
  };
  const handleChangeStartOnlyRead = (e: React.FormEvent<HTMLInputElement>) => {
    handleChangeConfig("startonlyread", e.target.checked);
  };

  return (
    <HomePageContainer>
      <Form>
        <Form.Check
          type="switch"
          label={i18n("Show only read titles")}
          id="config-read-titles"
        />
        <Form.Check
          type="switch"
          id="config-start-only-read"
          label={i18n("Add only when starting to read")}
        />
        <FloatingLabel label={i18n("Display list:")} className="col-md-4">
          <Form.Select
            aria-label="Floating label select example"
            defaultChecked={statHomeList}
            id="config-home-list"
            onChange={(e) => {
              try {
                chrome.storage.local.set({
                  "config.homelist": e.target.checked,
                });
              } catch (error) {}
            }}
          >
            <option>{i18n("Select the home page list")}</option>
            <option disabled>-------{i18n("Lists")}--------</option>
            <option disabled>-------{i18n("Tags")}--------</option>
            {Object.keys(tags)
              .sort((a, b) => (tags[a] > tags[b] ? -1 : 1))
              .map((tag) => (
                <option key={`home-page-${tag}`} value={tag}>{`${i18n(tag)} (${
                  tags[tag]
                })`}</option>
              ))}
          </Form.Select>
        </FloatingLabel>
      </Form>
    </HomePageContainer>
  );
};

const handleChangeConfig = (prop: string, value: string | number | boolean) => {
  const mangaList = JSON.parse(
    localStorage.getItem("mangakeeper.configs") || "{}"
  );

  mangaList[prop] = value;
  localStorage.setItem("mangakeeper.configs", JSON.stringify(mangaList));
};
export default GeneralPage;
