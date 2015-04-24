Title: MSM  
Subtitle: Detailed Design Specification  
Date:   July 25, 2005 
Version: 1.0.0

| Authors | Company | Contact |
|-------|-------|-------|
| Giacomo Tagliabue | Hyla Soft USA | g.tagliabue@hylasoftusa.com |
| Brian Soble | Hyla Soft USA | b.soble@hylasoftusa.com |

| Distribution List | Company | Contact |
|-------|-------|-------|
| Giacomo Tagliabue | Hyla Soft USA | g.tagliabue@hylasoftusa.com |
| Brian Soble | Hyla Soft USA | b.soble@hylasoftusa.com |
| Sebastien Lorandel | Hyla Soft USA | s.lorandel@hylasoftusa.com |
| Ettore Soldi | Hyla Soft USA | e.soldi@hylasoftusa.com |

| Revision | Date | Description | Contributors |
|-------|-------|-------|-----|
| 0.1 | 2/19/2014 | Initial draft | Giacomo Tagliabue |
| 0.2 | 3/5/2014 | Use cases | Brian Soble |
| 0.3 | 4/28/2014 | SIT section + finalization | Giacomo Tagliabue |

# Introduction
This document provides explicit information about the requirement and the implementation details for the library Machine Shop Job Management (hereafter MSM) for Siemens© SIMATIC IT©. MSM is a web based system that aims at delivering a cost effective solution for small and mediums shop floors to accomplish the basic needs of part manufacturing and machine shop management using a well-defined subset of the SIMATIC IT Suite, while making the configuration and installation process fast and straight-forward, and leveraging new cutting-edge web technologies to provide a fresh and modern experience to the users, and in order to leave hardware requirements both on the server and the client machines to the minimum.

## Scope of the document
The Detailed Design Specification document provides a detailed overview of the system, describing what the purpose of the product is and the needs that addresses, describing the use cases and the features, as well as non-functional needs that the system must ensure. The document describes the details that will guide the implementation of the system, starting from a high level description and then analyzing each component and the interactions between them and the external system involved. The following document contains all and only the requirements and specifications that the system must cover.

The document is composed of the following main sections, each covering a different aspect of the system specification.

### Functional Specification
The purpose of the section is to describe and classify in a clear way what the system should allow the user to do. After describing a high-level goal of the product, it lists and describes all the requirements that the system must cover in order to provide the desired product. These requirements are strictly related to the use cases, thus they will be grouped in a list of different use cases, separated by the role.

### Non-functional Specification
In this section are contained all the requirements that are not strictly related to the purpose of the system, such as performance and security requirements. As for the functional requirements, the final product must guarantee that all the non-functional requirements described here are met.

### Design Details
This section gives all the required detail that are necessary to implement the system. It defines the architecture of the product and gives a high-level overview of the system; it defines and analyzes each modular component and the interactions that incur between the components and between MSM and other external systems.

### Business Logic
The section lists the main operations that are done on the server and explains the flow of information (read/write), the checks performed and the sub cases that the operation covers. Workflow diagrams can be used to graphically represent the operations.

### Software and Hardware Requirements
The sections describes in which environment the product is guaranteed to work correctly. MSM, as any software product, requires a minimum hardware configuration and depends on other software that must be present in the system.

## Limits of the document
In the ever changing environment of web applications development, an agile and incremental approach to developing result in a better software, shipped in less time, with less costs, and less bugs. Perhaps the biggest problem with software development is changing requirements. Agile processes accept the reality of change versus the hunt for complete, rigid specifications. For most projects readily accepting changes can actually cost less than ensuring requirements will never change. We embrace this view, and therefore, to maintain an agile approach to the development of the system, the level of detail of this document is not going to cover all the technical characteristic of the product, especially when discussing about the code structure. For example, an UML class diagram will not be provided, and the APIs here described are only an indication of the functionalities that they have to expose, but the final APIs could change during the development phase, when new problems and considerations arise.

## Acronyms and Abbreviations
The following is a list of common acronyms used throughout the document:

| asd    | sadasddad  |
|--------|------------|
| SIT    | Simatic IT |
| MSM    | Machine Job Shop Management |
| TC     |  Teamcenter |
| API    | Application Programming Interface |
| MM     |  Material Manager |
| POM    | Production Order Manager |
| BPM    | Business Process Modeler |
| BREAD  | Browse, Read, Edit, Add, Delete |


# Functional Specification

## Purpose of the project

As described by the ISA-95 standard, a Manufacturing Execution System (MES) is a level 3 system bridging enterprise level systems like ERP (level 4), and lower level systems at the plant and control levels (level 0-2). SIMATIC IT (“SIT”) by Siemens is the world’s leading MES platform. MSM presents a set of user interfaces for order management and access to other applications, to be used with a “lite” installation of SIT. The details of the SIT components used in the product are defined later in the document.

The functional objective of MSM is to provide a lightweight user interface for order management and execution specifically designed for machine shops, while providing the following benefits:

1. Modern Client Application based on modern web technologies (HTML5)
1. Minimal Hardware Footprint
1. Easy Installation and configuration
1. Easy Extensibility and “Open” APIs to allow the customer to modify the product

## Roles
MSM is positioned for machine shops, which can be characterized as discrete part manufacturers who typically employ machining such as CNC in their manufacturing processes. The end users of this software will consist of three groups: CNC Operator, Production Supervisor, and System Administrator.

### Operator
The Operator role refers to a CNC machine operator. Operator use cases are typically characterized by functionalities relating to the execution of machining operations, such as the setup and execution of a CNC program. The operator has limited capabilities regarding the management of the orders and the configuration of the system.

### Supervisor
The Supervisor role refers to personnel responsible for administering production schedules and procedures on the shop floor, such as a Shift Supervisor or Operations Manager. Supervisor use cases are typically characterized by functionalities relating to the administration of production procedures, such as manually overriding equipment assigned to a production order, or adding materials and orders to the database.

### System Administrator
The System Administrator role refers to personnel responsible for overseeing the in-production functionality of MSM. System Administrator use cases are typically characterized by functionalities relating to system configuration or performance, such as checking system log files for systems errors or traceability, or changing the global configurations of the system.

## Use Cases

Each one of the following use cases has a numeric identifier for easily referral.

### Operator

1. __Browse through equipment items__  
As an operator I want to browse the list of equipment that I can access to. I want to be able to filter and sort the list based on the Equipment ID and whether the machine already has an operation running on it. I want to be able to select an equipment and access the list of all the operations related to the selected equipment.
1. __Browse through operations__  
As an operator, I want to browse the list of operations I have access to. As an operator, I want to be able to filter and sort the list of operations based on the status, order ID, operation type, and start time. The user interface should update in real time according to the filtered parameters. I want to be able to select an Operation and access the operation details.
1. __Operation details__  
As an operator, I want to access the available information regarding a selected operation. I want up-to-date information of the status of the operation, as well as its progress status (number of good and scrap parts, elapsed operation time, operation start time).
