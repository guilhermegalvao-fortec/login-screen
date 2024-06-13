"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Home() {
  const [name, setName] = useState("");
  const [erroName, setErroName] = useState("");
  const [lastName, setLastName] = useState("");
  const [erroLastName, setErroLastName] = useState("");
  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [radioQuery, setRadioQuery] = useState("");
  const [erroCheckbox, setErroCheckbox] = useState("");
  const [message, setMessage] = useState("");
  const [erroMessage, setErroMessage] = useState("");
  const [terms, setTerms] = useState(false);
  const [erroTerms, setErroTerms] = useState("");
  const [show, setShow] = useState(true);

  const handleChangeName = (event: any) => {
    if (event.target.value.trim().length > 0) {
      setErroName("");
    }
    setName(event.target.value);
  };

  const handleChangeLastName = (event: any) => {
    if (event.target.value.trim().length > 0) {
      setErroLastName("");
    }
    setLastName(event.target.value);
  };

  const handleChangeEmail = (event: any) => {
    if (event.target.value.trim().length > 0) {
      setErroEmail("");
    }
    setEmail(event.target.value);
  };

  const handleChangeRadioItem = (value: string) => {
    if (value.length > 0) {
      setErroCheckbox("");
    }
    setRadioQuery((prevValue) => (prevValue === value ? "" : value));
  };

  const handleChangeMessage = (event: any) => {
    if (event.target.value.trim().length > 0) {
      setErroMessage("");
    }
    setMessage(event.target.value);
  };

  const cleanRadioItem = (value: string) => {
    if (radioQuery === value) {
      setRadioQuery("");
    }
  };
  const handleChangeTerms = (value: boolean) => {
    if (value === true) {
      setErroTerms("");
    }
    setTerms((terms) => !terms);
  };

  type Rule = {
    rules: {
      isValid: boolean;
      onError: () => void;
    }[];
  };

  // array de validacoes
  // cada item do array é um objeto com as regras de validacao daquele objeto
  // onde essas regras tbm sao um array
  // cada regra de validacao tem dois campos
  // isValid: que retorna se a regra é valida ou nao
  // onError: uma funcao que vai ser executada caso a regra nao seja valida
  // se falha na primeira regra, nao tem pq eu fazer as outras

  const rules: Rule[] = [
    {
      rules: [
        {
          isValid: name.trim().length !== 0,
          onError: () => setErroName("O campo Nome precisa ser preenchido"),
        },
      ],
    },
    {
      rules: [
        {
          isValid: !!lastName.trim(),
          onError: () =>
            setErroLastName("O campo Last Name precisa ser preenchido"),
        },
      ],
    },
    {
      rules: [
        {
          isValid: !!email.trim(),
          onError: () => setErroEmail("O campo e-mail precisa ser preenchido"),
        },
        {
          isValid: email.includes("@"),
          onError: () => setErroEmail("O e-mail está inválido"),
        },
      ],
    },
    {
      rules: [
        {
          isValid: !!radioQuery,
          onError: () => setErroCheckbox("Selecione uma das opções"),
        },
      ],
    },
    {
      rules: [
        {
          isValid: !!message.trim(),
          onError: () =>
            setErroMessage("O campo Message precisa ser preenchido"),
        },
      ],
    },
    {
      rules: [
        {
          isValid: terms,
          onError: () => setErroTerms("Você precisa aceitar os termos"),
        },
      ],
    },
  ];

  const showData = async (event: any) => {
    event.preventDefault();
    setErroName("");
    setErroLastName("");
    setErroEmail("");
    setErroCheckbox("");
    setErroMessage("");
    setErroTerms("");

    let showFetchData = true;

    rules.forEach((rule) => {
      const rulesLength = rule.rules.length;
      if (rulesLength === 1) {
        if (!rule.rules[0].isValid) {
          rule.rules[0].onError();
          showFetchData = false;
        }
      } else {
        let shouldGoToNextRule = true;
        rule.rules.forEach((rule) => {
          if (!rule.isValid && shouldGoToNextRule) {
            rule.onError();
            showFetchData = false;
            shouldGoToNextRule = false;
          }
        });
      }
    });

    if (!showFetchData) {
      return;
    } else {
      let _data = {
        name,
        lastName,
        email,
        message,
        radioQuery,
        terms,
      };

      console.log(_data);
      const res = await fetch("http://localhost:3000/api", {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const dataSuccess = await res.json();
      console.log(dataSuccess);
    }
  };
  const handleChangeReset = (event: any) => {
    event.preventDefault();
    setName("");
    setLastName("");
    setEmail("");
    setMessage("");
    setRadioQuery("");
    setTerms(false);
    setErroName("");
    setErroLastName("");
    setErroEmail("");
    setErroCheckbox("");
    setErroMessage("");
    setErroTerms("");
  };
  return (
    <div className="h-full min-h-screen flex items-center justify-center bg-emerald-100 p-10">
      <form
        onSubmit={showData}
        className="space-y-4  bg-white max-w-[600px] max-w- rounded-lg p-4"
      >
        <h1 className="text-xl font-semibold">Contact Us</h1>
        <div className="flex flex-col md:flex-row gap-4 md:gap-3 w-full">
          <div className="space-y-2 md:w-2/4">
            <Label
              htmlFor="First Name"
              className="text-xs text-gray-500 outline-none ring-0"
            >
              First Name
            </Label>
            <Input
              type="tex"
              className="md:w-full"
              value={name}
              onChange={handleChangeName}
            />
            {<p className="text-red-500 text-xs">{erroName}</p>}
          </div>
          <div className="space-y-2 md:w-2/4">
            <Label htmlFor="Last Name" className="text-xs text-gray-500">
              Last Name
            </Label>
            <Input
              type="text"
              className="md:w-full"
              value={lastName}
              onChange={handleChangeLastName}
            />
            {<p className="text-red-500 text-xs">{erroLastName}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs text-gray-500">
            Email Address
          </Label>
          <Input type="text" value={email} onChange={handleChangeEmail} />
          {<p className="text-red-500 text-xs pl-2">{erroEmail}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email" className="text-xs text-gray-500">
            Query Type
          </Label>
          <div className="flex flex-col gap-1">
            <RadioGroup
              className="flex flex-col md:flex-row gap-3 w-full"
              value={radioQuery}
              onValueChange={handleChangeRadioItem}
            >
              <div className="border rounded-lg py-2 px-5 flex items-center gap-4 hover:border-emerald-600 md:w-2/4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="General Enquiry"
                    onClick={() => cleanRadioItem("General Enquiry")}
                  />
                  <Label>General Enquiry</Label>
                </div>
              </div>
              <div className="border rounded-lg py-2 px-5 flex items-center gap-4 hover:border-emerald-600 md:w-2/4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Support Request"
                    onClick={() => cleanRadioItem("Support Request")}
                  />
                  <Label>Support Request</Label>
                </div>
              </div>
            </RadioGroup>
            {<p className="text-red-500 text-xs pl-2">{erroCheckbox}</p>}
          </div>
        </div>
        <div className="space-y-3">
          <Label htmlFor="email" className="text-xs text-gray-500">
            Message
          </Label>
          <Textarea
            className="resize-none h-[200px] md:h-[100px] text-xs md:text-sm"
            value={message}
            onChange={handleChangeMessage}
          />
          {<p className="text-red-500 text-xs">{erroMessage}</p>}
        </div>
        <div className="flex flex-col md:flex-row gap-1">
          <div className="flex items-center gap-3 pl-1">
            <Checkbox checked={terms} onCheckedChange={handleChangeTerms} />
            <Label htmlFor="email" className="text-[11px]  text-gray-500">
              I consent to being contacted by the team
            </Label>
          </div>
          {<p className="text-red-500 text-xs pl-2">{erroTerms}</p>}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleChangeReset}
            className="w-2/4 bg-emerald-600 hover:bg-emerald-900"
          >
            Resetar
          </Button>
          <Button className="w-2/4 bg-emerald-600 hover:bg-emerald-900">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
